import { HttpParams } from '@angular/common/http';
import { PageQuery } from '../../models/page-query';
import {
  GridApi,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
} from 'ag-grid-community';
export function createFormData(
  formValue: Record<string | number, string>
): FormData {
  const formData = new FormData();
  for (const key of Object.keys(formValue)) {
    const index = isNaN(Number(key)) ? key : Number(key);
    const value = formValue[index];
    formData.append(String(key), value);
  }
  return formData;
}
export function paramNotNull(...source: any[]): boolean {
  return source.every((s) => (s ? true : false));
}
export function isNumber(str: string | number): boolean {
  var parsed = parseFloat(str.toString());
  var casted = +str;
  return parsed === casted && !isNaN(parsed) && !isNaN(casted);
}

export function isNullOrWhiteSpace(value: string) {
  if (value == null || value == 'null' || value === '') return true;
  return value.toString().replace(/\s/g, '').length == 0;
}

export function createHttpParams(requestModel: any) {
  let httpParams = new HttpParams();
  Object.keys(requestModel).forEach(function (key) {
    if (
      !isNullOrWhiteSpace(requestModel[key]) &&
      typeof requestModel[key] === 'object'
    ) {
      for (var keyParam in requestModel[key]) {
        if (requestModel[key].hasOwnerProperty(keyParam)) {
          httpParams = httpParams.append(
            key + '.' + keyParam,
            requestModel[key][keyParam]
          );
        }
      }
    } else if (!isNullOrWhiteSpace(requestModel[key])) {
      httpParams = httpParams.append(key, requestModel[key]);
    }
  });
  return httpParams;
}
export function b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function groupBy(xs: any, key: any) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
export function distinct(xs: any) {
  return xs.reduce((acc: any, value: any) => {
    return !acc.includes(value) ? acc.concat(value) : acc;
  }, []);
}

export function makeServerSideDataSource(
  service: any,
  method: any,
  filter: PageQuery
  //api: GridApi
) {
  let dataSource = {
    getRows: (params: IServerSideGetRowsParams) => {
      console.log(params.request);
      const { startRow, endRow } = params.request as IServerSideGetRowsRequest;

      const page =
        startRow !== undefined && endRow !== undefined
          ? Math.floor(startRow / (endRow - startRow)) + 1
          : 1;

      const pageSize =
        startRow !== undefined && endRow !== undefined ? endRow - startRow : 0;
      filter.page = page;
      filter.pageSize = pageSize;

      service[method](filter).subscribe({
        next: (response: any) => {
          params.success({
            rowData: response.items,
            rowCount: response.total,
          });
        },
        error: () => {
          params.fail();
        },
      });
    },
  };
  // api.setGridOption('serverSideDatasource', dataSource);
  return dataSource;
}

export function formatNumber(number: string, decimalFacor: number = 1000) {
  let numbers = number.toString().split('.');
  return (
    numbers[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
    (numbers.length > 1
      ? (Math.round(+('0.' + numbers[1]) * decimalFacor) / decimalFacor)
          .toString()
          .replace('0.', '.')
      : '')
  );
}

const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

export const jalaliToGregorian = (_jy: string, _jm: string, _jd: string) => {
  const j_y = parseInt(_jy);
  const j_m = parseInt(_jm);
  const j_d = parseInt(_jd);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;

  var j_day_no =
    365 * jy +
    parseInt((jy / 33).toString()) * 8 +
    parseInt((((jy % 33) + 3) / 4).toString());
  for (var i = 0; i < jm; ++i) j_day_no += j_days_in_month[i];

  j_day_no += jd;

  var g_day_no = j_day_no + 79;

  var gy =
    1600 +
    400 *
      parseInt(
        (g_day_no / 146097).toString()
      ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    /* 36525 = 365*100 + 100/4 */ g_day_no--;
    gy +=
      100 *
      parseInt(
        (g_day_no / 36524).toString()
      ); /* 36524 = 365*100 + 100/4 - 100/100 */
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * parseInt((g_day_no / 1461).toString()); /* 1461 = 365*4 + 4/4 */
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;

    g_day_no--;
    gy += parseInt((g_day_no / 365).toString());
    g_day_no = g_day_no % 365;
  }

  for (var i = 0; g_day_no >= g_days_in_month[i] + Number(i == 1 && leap); i++)
    g_day_no -= g_days_in_month[i] + Number(i == 1 && leap);
  var gm: any = i + 1;
  var gd: any = g_day_no + 1;

  gm = gm < 10 ? '0' + gm : gm;
  gd = gd < 10 ? '0' + gd : gd;

  return gy + '-' + gm + '-' + gd;
};

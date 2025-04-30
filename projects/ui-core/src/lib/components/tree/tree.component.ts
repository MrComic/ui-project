import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  @Input() nodes: any[] = [];
  @Input() currentParentId: number | null = null;
  @Input() level: number = 0;
  @Input() rtl: boolean = false;
  @Input() expandedNodes: Set<number> = new Set<number>();
  @Output() nodeRightClick = new EventEmitter<{
    event: MouseEvent;
    node: any;
  }>();
  @Output() expandedNodesChange = new EventEmitter<Set<number>>();

  // Get children for current parent
  getChildren(parentId: number | null) {
    return this.nodes.filter((node) => node.parentId === parentId);
  }

  // Check if node has children
  hasChildren(nodeId: number): boolean {
    return this.nodes.some((node) => node.parentId === nodeId);
  }

  // Toggle node expansion
  toggle(node: any) {
    if (this.expandedNodes.has(node.id)) {
      this.expandedNodes.delete(node.id);
    } else {
      this.expandedNodes.add(node.id);
    }
    this.expandedNodesChange.emit(this.expandedNodes);
  }

  onNodeRightClick(event: MouseEvent, node: any) {
    event.preventDefault();
    event.stopPropagation();
    this.nodeRightClick.emit({ event, node });
  }

  onNodeClick(node: any) {
    if (this.hasChildren(node.id)) {
      this.toggle(node);
    }
  }
}

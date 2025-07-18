import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  imports: [CdkDropList, NzButtonModule, NzSplitterModule],
  template: `
    <nz-splitter>
      <nz-splitter-panel nzDefaultSize="25%" nzMin="25%" nzMax="75%">
        <div class="flex flex-col h-full p-3">
          <div class="bg-gray-50 grow overflow-auto">Content</div>
          <div class="flex-none">
            <button nz-button nzType="primary" nzBlock>Add question</button>
          </div>
        </div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="box">Second</div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
})
export class App {
  protected title = 'its-just-a-form';
}

import { Component, input } from '@angular/core';
import { Question } from './store';

@Component({
  selector: 'app-question-list-item',
  imports: [],
  template: `
    <!--    <mat-list-item cdkDrag style="cursor: move">-->
    <!--      <mat-icon matListItemIcon>{{ question().icon }}</mat-icon>-->
    <!--      <h3 matListItemTitle>{{ question().label }}</h3>-->
    <!--      <div class="invisible" matListItemMeta>-->
    <!--        <button mat-icon-button>-->
    <!--          <mat-icon fontSet="material-icons-outlined">settings</mat-icon>-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </mat-list-item>-->
  `,
  styles: `
    mat-list-item:hover div {
      visibility: visible !important;
    }
  `,
})
export class QuestionListItem {}

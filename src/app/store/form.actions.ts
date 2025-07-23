import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PreviewForm } from './form-builder.reducer';

export const formActions = createActionGroup({
  source: 'Form',
  events: {
    Initialized: emptyProps(),
    Loaded: props<{ id: string; name: string; form: PreviewForm[] }>(),
  },
});

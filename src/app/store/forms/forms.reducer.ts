import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { v7 as uuidv7 } from 'uuid';
import { formsActions } from './forms.actions';

export interface Form {
  id: string;
  name: string;
  data: string;
}

const initialForms: Form[] = [
  { id: uuidv7(), name: 'Personal information', data: '' },
  { id: uuidv7(), name: 'Contact information', data: '' },
  { id: uuidv7(), name: 'Employment information', data: '' },
];

export interface State extends EntityState<Form> {
  selectedUserId: string | null;
}

export function selectFormId(form: Form): string {
  //In this case this would be optional since primary key is id
  return form.id;
}

export const adapter = createEntityAdapter<Form>({
  selectId: selectFormId,
  sortComparer: false,
});

export const initialState: State = adapter.setAll(
  initialForms,
  adapter.getInitialState({
    selectedUserId: null,
  }),
);

export const reducer = createReducer(
  initialState,
  on(formsActions.remove, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
);

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of user ids
export const selectFormIds = selectIds;

// select the dictionary of user entities
export const selectFormEntities = selectEntities;

// select the array of users
export const selectAllForms = selectAll;

// select the total user count
export const selectFormTotal = selectTotal;

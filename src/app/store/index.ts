import { v7 as uuidv7 } from 'uuid';

export type InputTypes =
  | 'checkbox'
  | 'date'
  | 'select'
  | 'text'
  | 'textarea'
  | 'toggle';

export interface FormInput {
  label: string;
  type: InputTypes;
}

export interface FormStep {
  type:
    | 'adjudicate'
    | 'ai_question'
    | 'form'
    | 'question'
    | 'route_to_form'
    | 'route_to_url';
  icon: string;
  title: string;
  subtitle: string;
  input?: InputTypes;
  options?: string[];
  questions?: FormInput[];
}

export interface Question {
  id: string;
  type: InputTypes;
  label: string;
  icon: string;
  options?: string[];
}

export const initialQuestions: Question[] = [
  {
    id: uuidv7(),
    type: 'text',
    label: 'Preferred first name',
    icon: 'text_format',
  },
  {
    id: uuidv7(),
    type: 'textarea',
    label: 'Additional details',
    icon: 'subject',
  },
  {
    id: uuidv7(),
    type: 'date',
    label: 'Date of birth',
    icon: 'calendar_month',
  },
  {
    id: uuidv7(),
    type: 'select',
    label: 'Gender',
    icon: 'arrow_drop_down',
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: uuidv7(),
    type: 'toggle',
    label: 'Unable to work due to injury',
    icon: 'toggle_on',
  },
  {
    id: uuidv7(),
    type: 'checkbox',
    label: 'Indicate your injuries',
    icon: 'checklist',
  },
];

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
    id: '0',
    type: 'text',
    label: 'Preferred first name',
    icon: 'text_format',
  },
  {
    id: '1',
    type: 'textarea',
    label: 'Additional details',
    icon: 'subject',
  },
  { id: '2', type: 'date', label: 'Date of birth', icon: 'calendar_month' },
  {
    id: '3',
    type: 'select',
    label: 'Gender',
    icon: 'arrow_drop_down',
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: '4',
    type: 'toggle',
    label: 'Unable to work due to injury',
    icon: 'toggle_on',
  },
  {
    id: '5',
    type: 'checkbox',
    label: 'Indicate your injuries',
    icon: 'checklist',
  },
];


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

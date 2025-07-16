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
  input?: 'date' | 'select' | 'text' | 'textarea' | 'toggle';
  options?: string[];
}

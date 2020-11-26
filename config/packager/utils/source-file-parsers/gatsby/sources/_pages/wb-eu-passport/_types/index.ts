export type LoginByPhoneRequestType = {
  phone: string;
  is_terms_and_conditions_accepted: boolean;
};

export type AuthorizationSnakeCaseType = {
  token: string;
  till_next_request: number;
};

export type LoginRequestParamsType = {
  options?: {
    notify_code: string;
  };
  token: string;
  device: string;
  version: string;
};

export type RouterLoginOptionsType = {
  redirect_url?: string;
  csrf_token?: string;
};

export type FormParamsType = {
  phone: string;
  acceptCondition: boolean;
};

// 회원가입 폼 상태
interface SignUpFormState {
    profileImage: string | null;
    userId: string;
    password: string;
    nickname: string;
    birth: number;
    sex: string;
    leisurely_flag : boolean
    planner_flag  : boolean
    adventurous_flag  : boolean
    vehicle_travel_flag  : boolean
    photo_preference_flag  : boolean
  }
// 유효성 검사 상태
interface IsValidationState {
    isId: boolean;
    isPassword: boolean;
    isPasswordConfirm: boolean;
    isNickname: boolean;
    isBirth: boolean;
}
interface Year {
    label: string;
    value: number;
  }

export {
    SignUpFormState,
    IsValidationState,
    Year,
}
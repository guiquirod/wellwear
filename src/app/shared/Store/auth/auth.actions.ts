import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthDTO } from '../../Models/auth.dto';
import { UserDTO } from '../../Models/user.dto';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ credentials: AuthDTO }>(),
    Register: props<{ credentials: AuthDTO }>(),
    Logout: emptyProps(),
    'Delete User': emptyProps(),
    'Load Auth From Storage': emptyProps(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login Success': props<{ user: UserDTO }>(),
    'Login Failure': props<{ error: string }>(),
    'Register Success': props<{ user: UserDTO }>(),
    'Register Failure': props<{ error: string }>(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
    'Delete User Success': emptyProps(),
    'Delete User Failure': props<{ error: string }>(),
    'Load Auth From Storage Success': props<{ user: UserDTO }>(),
  },
});

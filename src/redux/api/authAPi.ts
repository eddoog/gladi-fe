import { baseApi } from './baseApi'
import { LoginResponse, 
    LoginRequest, 
    RegisterRequest, 
    RegisterResponse,
  UserInfoResponse } from '../types/auth'

const AUTH_API = 'https://auth-service-73zeqjyhhq-et.a.run.app/api/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: AUTH_API + '/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: AUTH_API + '/register',
        method: 'POST',
        body,
      }),
    }),
    getUserInfo: builder.query<UserInfoResponse, void>({
      query: () => ({
        url:  AUTH_API + '/info',
        method: 'GET',
      }),
    }),    
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserInfoQuery,
  useGetUserInfoQuery
} = authApi

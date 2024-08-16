// @ts-nocheck
import { z } from 'zod'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authGithubEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  url?: Maybe<Scalars['String']['output']>
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityAdminCreateInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type IdentityAdminFindManyInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  ip: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export enum IdentityProvider {
  GitHub = 'GitHub',
}

export type IdentityUserFindManyInput = {
  username: Scalars['String']['input']
}

export type Index = {
  __typename?: 'Index'
  address: Scalars['String']['output']
  cluster: NetworkCluster
  createdAt?: Maybe<Scalars['DateTime']['output']>
  data?: Maybe<Scalars['JSON']['output']>
  dataHash?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  label?: Maybe<Scalars['String']['output']>
  program: Scalars['String']['output']
  type: IndexType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type IndexAdminCreateInput = {
  address: Scalars['String']['input']
  cluster: NetworkCluster
  label?: InputMaybe<Scalars['String']['input']>
  type: IndexType
}

export type IndexAdminFindManyInput = {
  cluster?: InputMaybe<NetworkCluster>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<IndexType>
}

export type IndexAdminResolveInput = {
  address: Scalars['String']['input']
  cluster: NetworkCluster
}

export type IndexAdminUpdateInput = {
  label?: InputMaybe<Scalars['String']['input']>
}

export type IndexPaging = {
  __typename?: 'IndexPaging'
  data: Array<Index>
  meta: PagingMeta
}

export enum IndexType {
  SolanaCollection = 'SolanaCollection',
  SolanaMint = 'SolanaMint',
}

export type IndexUserFindManyInput = {
  cluster?: InputMaybe<NetworkCluster>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<IndexType>
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateIdentity?: Maybe<Identity>
  adminCreateIndex?: Maybe<Index>
  adminCreateUser?: Maybe<User>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIndex?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminUpdateIndex?: Maybe<Index>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userUpdateUser?: Maybe<User>
}

export type MutationAdminCreateIdentityArgs = {
  input: IdentityAdminCreateInput
}

export type MutationAdminCreateIndexArgs = {
  input: IndexAdminCreateInput
}

export type MutationAdminCreateUserArgs = {
  input: UserAdminCreateInput
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteIndexArgs = {
  indexId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminUpdateIndexArgs = {
  indexId: Scalars['String']['input']
  input: IndexAdminUpdateInput
}

export type MutationAdminUpdateUserArgs = {
  input: UserAdminUpdateInput
  userId: Scalars['String']['input']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserUpdateUserArgs = {
  input: UserUserUpdateInput
}

export enum NetworkCluster {
  SolanaCustom = 'SolanaCustom',
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyIndex: IndexPaging
  adminFindManyUser: UserPaging
  adminFindOneIndex?: Maybe<Index>
  adminFindOneUser?: Maybe<User>
  adminGetAccountInfo?: Maybe<Scalars['JSON']['output']>
  adminResolveIndex?: Maybe<Scalars['JSON']['output']>
  adminResolveWallet?: Maybe<Scalars['JSON']['output']>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyIndex: IndexPaging
  userFindManyUser: UserPaging
  userFindOneIndex?: Maybe<Index>
  userFindOneUser?: Maybe<User>
}

export type QueryAdminFindManyIdentityArgs = {
  input: IdentityAdminFindManyInput
}

export type QueryAdminFindManyIndexArgs = {
  input: IndexAdminFindManyInput
}

export type QueryAdminFindManyUserArgs = {
  input: UserAdminFindManyInput
}

export type QueryAdminFindOneIndexArgs = {
  indexId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminGetAccountInfoArgs = {
  input: IndexAdminResolveInput
}

export type QueryAdminResolveIndexArgs = {
  input: IndexAdminResolveInput
}

export type QueryAdminResolveWalletArgs = {
  input: IndexAdminResolveInput
  wallet: Scalars['String']['input']
}

export type QueryUserFindManyIdentityArgs = {
  input: IdentityUserFindManyInput
}

export type QueryUserFindManyIndexArgs = {
  input: IndexUserFindManyInput
}

export type QueryUserFindManyUserArgs = {
  input: UserUserFindManyInput
}

export type QueryUserFindOneIndexArgs = {
  indexId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type RegisterInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  identities?: Maybe<Array<Identity>>
  name?: Maybe<Scalars['String']['output']>
  profileUrl: Scalars['String']['output']
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserAdminCreateInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type UserAdminFindManyInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type UserAdminUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUserFindManyInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserUserUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authGithubEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    authGithubEnabled: boolean
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
  }
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  expired?: boolean | null
  id: string
  name?: string | null
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt: Date
  url?: string | null
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  ip: string
  userAgent: string
  verified: boolean
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: IdentityAdminFindManyInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      ip: string
      userAgent: string
      verified: boolean
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: IdentityAdminCreateInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{
  input: IdentityUserFindManyInput
}>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  }> | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type IndexDetailsFragment = {
  __typename?: 'Index'
  createdAt?: Date | null
  id: string
  type: IndexType
  cluster: NetworkCluster
  address: string
  label?: string | null
  data?: any | null
  dataHash?: string | null
  program: string
  updatedAt?: Date | null
}

export type AdminFindManyIndexQueryVariables = Exact<{
  input: IndexAdminFindManyInput
}>

export type AdminFindManyIndexQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'IndexPaging'
    data: Array<{
      __typename?: 'Index'
      createdAt?: Date | null
      id: string
      type: IndexType
      cluster: NetworkCluster
      address: string
      label?: string | null
      data?: any | null
      dataHash?: string | null
      program: string
      updatedAt?: Date | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneIndexQueryVariables = Exact<{
  indexId: Scalars['String']['input']
}>

export type AdminFindOneIndexQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Index'
    createdAt?: Date | null
    id: string
    type: IndexType
    cluster: NetworkCluster
    address: string
    label?: string | null
    data?: any | null
    dataHash?: string | null
    program: string
    updatedAt?: Date | null
  } | null
}

export type AdminGetAccountInfoQueryVariables = Exact<{
  input: IndexAdminResolveInput
}>

export type AdminGetAccountInfoQuery = { __typename?: 'Query'; item?: any | null }

export type AdminResolveIndexQueryVariables = Exact<{
  input: IndexAdminResolveInput
}>

export type AdminResolveIndexQuery = { __typename?: 'Query'; item?: any | null }

export type AdminResolveWalletQueryVariables = Exact<{
  input: IndexAdminResolveInput
  wallet: Scalars['String']['input']
}>

export type AdminResolveWalletQuery = { __typename?: 'Query'; item?: any | null }

export type AdminCreateIndexMutationVariables = Exact<{
  input: IndexAdminCreateInput
}>

export type AdminCreateIndexMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Index'
    createdAt?: Date | null
    id: string
    type: IndexType
    cluster: NetworkCluster
    address: string
    label?: string | null
    data?: any | null
    dataHash?: string | null
    program: string
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateIndexMutationVariables = Exact<{
  indexId: Scalars['String']['input']
  input: IndexAdminUpdateInput
}>

export type AdminUpdateIndexMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Index'
    createdAt?: Date | null
    id: string
    type: IndexType
    cluster: NetworkCluster
    address: string
    label?: string | null
    data?: any | null
    dataHash?: string | null
    program: string
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteIndexMutationVariables = Exact<{
  indexId: Scalars['String']['input']
}>

export type AdminDeleteIndexMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIndexQueryVariables = Exact<{
  input: IndexUserFindManyInput
}>

export type UserFindManyIndexQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'IndexPaging'
    data: Array<{
      __typename?: 'Index'
      createdAt?: Date | null
      id: string
      type: IndexType
      cluster: NetworkCluster
      address: string
      label?: string | null
      data?: any | null
      dataHash?: string | null
      program: string
      updatedAt?: Date | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneIndexQueryVariables = Exact<{
  indexId: Scalars['String']['input']
}>

export type UserFindOneIndexQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Index'
    createdAt?: Date | null
    id: string
    type: IndexType
    cluster: NetworkCluster
    address: string
    label?: string | null
    data?: any | null
    dataHash?: string | null
    program: string
    updatedAt?: Date | null
  } | null
}

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl: string
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: UserAdminCreateInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyUserQueryVariables = Exact<{
  input: UserAdminFindManyInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
      identities?: Array<{
        __typename?: 'Identity'
        createdAt: Date
        expired?: boolean | null
        id: string
        name?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt: Date
        url?: string | null
        verified?: boolean | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: UserAdminUpdateInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyUserQueryVariables = Exact<{
  input: UserUserFindManyInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUserUpdateInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authGithubEnabled
    authPasswordEnabled
    authRegisterEnabled
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    createdAt
    expired
    id
    name
    profile
    provider
    providerId
    updatedAt
    url
    verified
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    ip
    userAgent
    verified
  }
`
export const IndexDetailsFragmentDoc = gql`
  fragment IndexDetails on Index {
    createdAt
    id
    type
    cluster
    address
    label
    data
    dataHash
    program
    updatedAt
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    id
    name
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: IdentityAdminFindManyInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: IdentityAdminCreateInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity($input: IdentityUserFindManyInput!) {
    items: userFindManyIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const AdminFindManyIndexDocument = gql`
  query adminFindManyIndex($input: IndexAdminFindManyInput!) {
    paging: adminFindManyIndex(input: $input) {
      data {
        ...IndexDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${IndexDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneIndexDocument = gql`
  query adminFindOneIndex($indexId: String!) {
    item: adminFindOneIndex(indexId: $indexId) {
      ...IndexDetails
    }
  }
  ${IndexDetailsFragmentDoc}
`
export const AdminGetAccountInfoDocument = gql`
  query adminGetAccountInfo($input: IndexAdminResolveInput!) {
    item: adminGetAccountInfo(input: $input)
  }
`
export const AdminResolveIndexDocument = gql`
  query adminResolveIndex($input: IndexAdminResolveInput!) {
    item: adminResolveIndex(input: $input)
  }
`
export const AdminResolveWalletDocument = gql`
  query adminResolveWallet($input: IndexAdminResolveInput!, $wallet: String!) {
    item: adminResolveWallet(input: $input, wallet: $wallet)
  }
`
export const AdminCreateIndexDocument = gql`
  mutation adminCreateIndex($input: IndexAdminCreateInput!) {
    created: adminCreateIndex(input: $input) {
      ...IndexDetails
    }
  }
  ${IndexDetailsFragmentDoc}
`
export const AdminUpdateIndexDocument = gql`
  mutation adminUpdateIndex($indexId: String!, $input: IndexAdminUpdateInput!) {
    updated: adminUpdateIndex(indexId: $indexId, input: $input) {
      ...IndexDetails
    }
  }
  ${IndexDetailsFragmentDoc}
`
export const AdminDeleteIndexDocument = gql`
  mutation adminDeleteIndex($indexId: String!) {
    deleted: adminDeleteIndex(indexId: $indexId)
  }
`
export const UserFindManyIndexDocument = gql`
  query userFindManyIndex($input: IndexUserFindManyInput!) {
    paging: userFindManyIndex(input: $input) {
      data {
        ...IndexDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${IndexDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneIndexDocument = gql`
  query userFindOneIndex($indexId: String!) {
    item: userFindOneIndex(indexId: $indexId) {
      ...IndexDetails
    }
  }
  ${IndexDetailsFragmentDoc}
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: UserAdminCreateInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: UserAdminFindManyInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
        identities {
          ...IdentityDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: UserAdminUpdateInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserUserFindManyInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUserUpdateInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action()
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const AdminFindManyIndexDocumentString = print(AdminFindManyIndexDocument)
const AdminFindOneIndexDocumentString = print(AdminFindOneIndexDocument)
const AdminGetAccountInfoDocumentString = print(AdminGetAccountInfoDocument)
const AdminResolveIndexDocumentString = print(AdminResolveIndexDocument)
const AdminResolveWalletDocumentString = print(AdminResolveWalletDocument)
const AdminCreateIndexDocumentString = print(AdminCreateIndexDocument)
const AdminUpdateIndexDocumentString = print(AdminUpdateIndexDocument)
const AdminDeleteIndexDocumentString = print(AdminDeleteIndexDocument)
const UserFindManyIndexDocumentString = print(UserFindManyIndexDocument)
const UserFindOneIndexDocumentString = print(UserFindOneIndexDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LoginMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
        variables,
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
        variables,
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RegisterMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
        variables,
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
        variables,
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
        variables,
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
        variables,
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
        variables,
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
        variables,
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userFindManyIdentity(
      variables: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
        variables,
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
        variables,
      )
    },
    adminFindManyIndex(
      variables: AdminFindManyIndexQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIndexQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIndexQuery>(AdminFindManyIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIndex',
        'query',
        variables,
      )
    },
    adminFindOneIndex(
      variables: AdminFindOneIndexQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneIndexQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneIndexQuery>(AdminFindOneIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneIndex',
        'query',
        variables,
      )
    },
    adminGetAccountInfo(
      variables: AdminGetAccountInfoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetAccountInfoQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetAccountInfoQuery>(AdminGetAccountInfoDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetAccountInfo',
        'query',
        variables,
      )
    },
    adminResolveIndex(
      variables: AdminResolveIndexQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminResolveIndexQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminResolveIndexQuery>(AdminResolveIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminResolveIndex',
        'query',
        variables,
      )
    },
    adminResolveWallet(
      variables: AdminResolveWalletQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminResolveWalletQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminResolveWalletQuery>(AdminResolveWalletDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminResolveWallet',
        'query',
        variables,
      )
    },
    adminCreateIndex(
      variables: AdminCreateIndexMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIndexMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIndexMutation>(AdminCreateIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIndex',
        'mutation',
        variables,
      )
    },
    adminUpdateIndex(
      variables: AdminUpdateIndexMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateIndexMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateIndexMutation>(AdminUpdateIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateIndex',
        'mutation',
        variables,
      )
    },
    adminDeleteIndex(
      variables: AdminDeleteIndexMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIndexMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIndexMutation>(AdminDeleteIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIndex',
        'mutation',
        variables,
      )
    },
    userFindManyIndex(
      variables: UserFindManyIndexQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIndexQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIndexQuery>(UserFindManyIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIndex',
        'query',
        variables,
      )
    },
    userFindOneIndex(
      variables: UserFindOneIndexQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneIndexQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneIndexQuery>(UserFindOneIndexDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneIndex',
        'query',
        variables,
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
        variables,
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
        variables,
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
        variables,
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
        variables,
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
        variables,
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
        variables,
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
        variables,
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

type definedNonNullAny = {}

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v))

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const IndexTypeSchema = z.nativeEnum(IndexType)

export const NetworkClusterSchema = z.nativeEnum(NetworkCluster)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

export function IdentityAdminCreateInputSchema(): z.ZodObject<Properties<IdentityAdminCreateInput>> {
  return z.object({
    ownerId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function IdentityAdminFindManyInputSchema(): z.ZodObject<Properties<IdentityAdminFindManyInput>> {
  return z.object({
    ownerId: z.string().nullish(),
    provider: IdentityProviderSchema.nullish(),
  })
}

export function IdentityUserFindManyInputSchema(): z.ZodObject<Properties<IdentityUserFindManyInput>> {
  return z.object({
    username: z.string(),
  })
}

export function IndexAdminCreateInputSchema(): z.ZodObject<Properties<IndexAdminCreateInput>> {
  return z.object({
    address: z.string(),
    cluster: NetworkClusterSchema,
    label: z.string().nullish(),
    type: IndexTypeSchema,
  })
}

export function IndexAdminFindManyInputSchema(): z.ZodObject<Properties<IndexAdminFindManyInput>> {
  return z.object({
    cluster: NetworkClusterSchema.nullish(),
    limit: z.number().default(10).nullish(),
    page: z.number().default(1).nullish(),
    search: z.string().nullish(),
    type: IndexTypeSchema.nullish(),
  })
}

export function IndexAdminResolveInputSchema(): z.ZodObject<Properties<IndexAdminResolveInput>> {
  return z.object({
    address: z.string(),
    cluster: NetworkClusterSchema,
  })
}

export function IndexAdminUpdateInputSchema(): z.ZodObject<Properties<IndexAdminUpdateInput>> {
  return z.object({
    label: z.string().nullish(),
  })
}

export function IndexUserFindManyInputSchema(): z.ZodObject<Properties<IndexUserFindManyInput>> {
  return z.object({
    cluster: NetworkClusterSchema.nullish(),
    limit: z.number().default(10).nullish(),
    page: z.number().default(1).nullish(),
    search: z.string().nullish(),
    type: IndexTypeSchema.nullish(),
  })
}

export function LoginInputSchema(): z.ZodObject<Properties<LoginInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function RegisterInputSchema(): z.ZodObject<Properties<RegisterInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function UserAdminCreateInputSchema(): z.ZodObject<Properties<UserAdminCreateInput>> {
  return z.object({
    password: z.string().nullish(),
    username: z.string(),
  })
}

export function UserAdminFindManyInputSchema(): z.ZodObject<Properties<UserAdminFindManyInput>> {
  return z.object({
    limit: z.number().default(10).nullish(),
    page: z.number().default(1).nullish(),
    role: UserRoleSchema.nullish(),
    search: z.string().nullish(),
    status: UserStatusSchema.nullish(),
  })
}

export function UserAdminUpdateInputSchema(): z.ZodObject<Properties<UserAdminUpdateInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
    role: UserRoleSchema.nullish(),
    status: UserStatusSchema.nullish(),
    username: z.string().nullish(),
  })
}

export function UserUserFindManyInputSchema(): z.ZodObject<Properties<UserUserFindManyInput>> {
  return z.object({
    limit: z.number().default(10).nullish(),
    page: z.number().default(1).nullish(),
    search: z.string().nullish(),
  })
}

export function UserUserUpdateInputSchema(): z.ZodObject<Properties<UserUserUpdateInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
  })
}

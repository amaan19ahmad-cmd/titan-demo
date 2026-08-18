import "server-only";

import type {
  DashboardSnapshot,
  JarvisAnswer,
  JarvisRequest,
  TitanDataMode,
  TitanDataSource,
  TitanUnavailableError,
} from "./contracts";

export interface ProviderReady<T> {
  readonly status: "ready";
  readonly data: T;
}

export interface ProviderUnavailable {
  readonly status: "unavailable";
  readonly error: TitanUnavailableError;
}

export type ProviderResult<T> = ProviderReady<T> | ProviderUnavailable;

export interface TitanDataProvider {
  readonly mode: TitanDataMode;
  readonly source: TitanDataSource;
  readonly isDemo: boolean;
  readonly disclosure: string;

  getDashboard(): Promise<ProviderResult<DashboardSnapshot>>;
  answerJarvis(input: JarvisRequest): Promise<ProviderResult<JarvisAnswer>>;
}

import { CommitInfo } from "./CommitInfo.js";
export type OperationRepositoryInfo = {
  //default NPM stuff
  type?: string;
  url: string;
  directory?: string;

  // Indexed Operation-stuff that we added
  lastPullTimeAt?: number;
  lastCommitInfo?: CommitInfo;
  htmlUrl?: string;
  collaborators?: string[];
  forksCount?: number;
  stargazersCount?: number;
  watchersCount?: number;
  openIssuesCount?: number;
  size?: number;
  visibility?: string;
  defaultBranch?: string;
};

import * as core from '@actions/core'

export interface InputProps {
  targetFilepaths: string[]
  shouldSkipGenerateCustomActions: boolean
  shouldSkipGenerateReusableWorkflows: boolean
  shouldSkipGenerateAgenda: boolean
  outputFilepath: string
  overwrite: boolean
  makePullRequest: boolean
  pullRequestTitle: string
  pullRequestBody: string
  pullRequestBaseBranch: string
  pullRequestHeadBranchPrefix: string
  generateOnly: boolean
  githubBaseUrl: string
}

export const getProps = (): InputProps => ({
  targetFilepaths: core.getInput('target-filepaths') ? core.getInput('target-filepaths').split('\n') : [],
  shouldSkipGenerateCustomActions: core.getInput('should-skip-generate-custom-actions') === 'true',
  shouldSkipGenerateReusableWorkflows: core.getInput('should-skip-generate-reusable-workflows') === 'true',
  shouldSkipGenerateAgenda: core.getInput('should-skip-generate-agenda') === 'true',
  outputFilepath: core.getInput('output-filepath') || 'README.md',
  overwrite: core.getInput('overwrite') === 'true',
  makePullRequest: core.getInput('make-pull-request') === 'true',
  pullRequestTitle: core.getInput('pull-request-title') || 'docs: update GitHub Actions documentation',
  pullRequestBody:
    core.getInput('pull-request-body') ||
    'Auto-generated documentation update for GitHub Actions workflows and custom actions.',
  pullRequestBaseBranch: core.getInput('pull-request-base-branch'),
  pullRequestHeadBranchPrefix: core.getInput('pull-request-head-branch-prefix') || 'feature/github-actions-documenter',
  generateOnly: core.getInput('generate-only') === 'true',
  githubBaseUrl: core.getInput('github-base-url') || 'https://api.github.com',
})

export interface OutputProps {
  output: string
  caContent: string
  caAgenda: string
  rwContent: string
  rwAgenda: string
}

export const setOutputs = (outputs: OutputProps): void => {
  core.setOutput('output', outputs.output)
  core.setOutput('output-ca', outputs.caContent)
  core.setOutput('agenda-ca', outputs.caAgenda)
  core.setOutput('output-rw', outputs.rwContent)
  core.setOutput('agenda-rw', outputs.rwAgenda)
}

export const setFailed = (errMsg: string): void => core.setFailed(errMsg)
import * as core from '@actions/core';
import * as github from '@actions/github';

const main = async () => {
  try {
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const pr_number = parseInt(core.getInput('pr_number', { required: true }));
    const token = core.getInput('token', { required: true });

    const octokit = github.getOctokit(token);

    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pr_number,
    });

    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pr_number,
      body: `
       Hello to the worlds
       YOU HAVE ADDITIONS: ${changedFiles[0].additions}
      `,
    });
  } catch (error) {
    console.error(error);
  }
};

main();
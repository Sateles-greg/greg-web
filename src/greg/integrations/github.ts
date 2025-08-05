import { Octokit } from '@octokit/rest';

/**
 * Realiza um auto-patch simbiótico em um arquivo do repositório no GitHub.
 * @param repo Nome do repositório no formato "owner/repo"
 * @param file Caminho do arquivo a ser atualizado
 * @param content Novo conteúdo do arquivo
 */
export async function commitAutoPatch(
  repo: string,
  file: string,
  content: string
) {
  // Token seguro via variável de ambiente (compatível Node.js)
  const token = process.env.VITE_GREG_GITHUB_TOKEN;
  if (!token)
    throw new Error(
      'Token do GitHub não encontrado. Configure VITE_GREG_GITHUB_TOKEN no .env'
    );
  const [owner, repoName] = repo.split('/');
  const octokit = new Octokit({ auth: token });

  // Obter último commit da branch main
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
  });
  const commitSha = refData.object.sha;
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo: repoName,
    commit_sha: commitSha,
  });
  const treeSha = commitData.tree.sha;

  // Criar blob com novo conteúdo
  const { data: blobData } = await octokit.git.createBlob({
    owner,
    repo: repoName,
    content,
    encoding: 'utf-8',
  });

  // Criar nova árvore
  const { data: treeData } = await octokit.git.createTree({
    owner,
    repo: repoName,
    base_tree: treeSha,
    tree: [{ path: file, mode: '100644', type: 'blob', sha: blobData.sha }],
  });

  // Criar commit simbiótico
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo: repoName,
    message: '🤖 Greg: Auto-patch simbiótico',
    tree: treeData.sha,
    parents: [commitSha],
  });

  // Atualizar ref da branch main
  await octokit.git.updateRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
    sha: newCommit.sha,
    force: true,
  });
}

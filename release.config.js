module.exports = {
    extends: "semantic-release-monorepo",
    branches: "master",
    repositoryUrl: "https://github.com/freelearn2000/Project1",
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/github', {
            assets: [
                {path: "Node_build.zip", label: "Node Build"},
                {path: "React_build.zip", label: "React Build"}
            ]
        }]
    ]
}
module.exports = {
    branches: "master",
    repositoryUrl: "https://github.com/freelearn2000/Project1",
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/github', {
            assets: [
                {path: "build.zip", label: "Build"}
            ]
        }]
    ]
}
import ballerina/http;
import thiyumiwickramasinghe/backend.github;

listener http:Listener ep = new (9090);

service / on ep {
    private final github:GithubClient githubClient;

    public function init() returns error? {
        self.githubClient = check new github:GithubClient();
    }

    resource function get builds() returns github:Build[]|error {
        return self.githubClient.getLatestBuilds();
    }
}
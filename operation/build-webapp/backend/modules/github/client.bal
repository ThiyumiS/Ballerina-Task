import ballerina/http;

public class GithubClient {

    private final http:Client httpClient;

    public function init() returns error? {
        self.httpClient  = check new (GITHUB_BASE_URL);
    }

    public function getLatestBuilds() returns Build[]|error {

        string path = string `/repos/${OWNER}/${REPO}/releases?per_page=${RELEASE_LIMIT}`;

        GithubRelease[] releases = check self.httpClient->get(path);

        return filterBuildAssets(releases);
    }
}

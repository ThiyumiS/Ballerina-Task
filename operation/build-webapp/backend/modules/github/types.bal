public type GithubAsset record {
    string name;
    string browser_download_url;
};

public type GithubRelease record {
    string tag_name;
    string created_at;
    GithubAsset[] assets;
};

public type Build record {
    string tag;
    string name;
    string downloadUrl;
    string createdAt;
};

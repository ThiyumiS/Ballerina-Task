public function filterBuildAssets(GithubRelease[] releases) returns Build[] {

        Build[] builds = [];

        foreach var release in releases {

            foreach var asset in release.assets {

                if asset.name.endsWith(".zip") && asset.name.includes("build") {

                    builds.push({
                        tag: release.tag_name,
                        name: asset.name,
                        downloadUrl: asset.browser_download_url,
                        createdAt: release.created_at
                    });
                }
            }
        }

        return builds;
    }

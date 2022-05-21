.PHONY: drafts
drafts:
	rg 'draft: true' content/posts

.PHONY: new
new:
	hugo new --kind post-bundle posts/$(POST)

.PHONY: drafts
drafts:
	rg 'draft: true' content/posts

.PHONY: new
new:
	hugo new --kind post-bundle posts/$(POST)

.PHONY: preview
preview:
	hugo server -D

.PHONY: run
run:
	hugo server

.PHONY: drafts
drafts:
	rg 'draft: true' content/posts | fzf --layout=reverse --preview=bat

.PHONY: new
new:
	hugo new --kind post-bundle posts/$(POST)

.PHONY: preview
preview:
	hugo server -D

.PHONY: run
run:
	hugo server

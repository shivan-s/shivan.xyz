.PHONY: drafts
drafts:
	rg 'draft: true' content/posts

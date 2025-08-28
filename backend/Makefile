.PHONY: help server worker both test clean

# Default target
help:
	@echo "Available targets:"
	@echo "  server  - Run the API server"
	@echo "  worker  - Run the background worker"
	@echo "  both    - Run both server and worker (in separate terminals)"
	@echo "  test    - Run tests"
	@echo "  clean   - Clean build artifacts"

# Run the API server
server:
	@echo "Starting API server..."
	go run ./cmd/server

# Run the background worker
worker:
	@echo "Starting background worker..."
	go run ./cmd/worker

# Run both server and worker (requires tmux)
both:
	@echo "Starting both server and worker..."
	@if command -v tmux >/dev/null 2>&1; then \
		tmux new-session -d -s fynelo-backend 'make server' \; \
		split-window -h 'make worker' \; \
		attach-session -d -t fynelo-backend; \
	else \
		echo "tmux not found. Please install tmux or run 'make server' and 'make worker' in separate terminals."; \
		echo "You can also use: make server & make worker"; \
	fi

# Run tests
test:
	go test ./...

# Clean build artifacts
clean:
	go clean
	rm -f server worker

# Build binaries
build:
	go build -o server ./cmd/server
	go build -o worker ./cmd/worker

# Install dependencies
deps:
	go mod download
	go mod tidy
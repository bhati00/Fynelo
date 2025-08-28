# Background Worker

The background worker processes search enrichment jobs queued by the API server.

## Purpose

- Processes search jobs that require data enrichment
- Handles retries with exponential backoff
- Provides health monitoring endpoints
- Runs independently from the API server

## Prerequisites

- Redis server running (required)
- Database connection (for future data enrichment)
- Same configuration as the API server

## Running the Worker

### Using Make
```bash
# Run worker only
make worker

# Run both API and worker (requires tmux)
make both
```

### Direct execution
```bash
go run ./cmd/worker
```

### Build and run
```bash
go build -o worker ./cmd/worker
./worker
```

## Health Monitoring

The worker exposes health check endpoints on port 8081:

- `GET /healthz` - Health check (returns 200 if healthy, 503 if unhealthy)
- `GET /stats` - Worker statistics (queue length, Redis availability)

Example:
```bash
curl http://localhost:8081/healthz
curl http://localhost:8081/stats
```

## Job Processing

### Job Lifecycle
1. **Pending** - Job is queued by API
2. **Processing** - Worker picks up job and starts processing
3. **Completed** - Job processed successfully
4. **Failed** - Job failed after max retries

### Retry Logic
- Default max retries: 3
- Exponential backoff: 1s, 2s, 4s, 8s (capped at 10s)
- Non-retryable errors fail immediately

### Current Implementation (Phase 4)
- Mock processing (2-second delay)
- Returns mock result count (15 companies)
- Simulates failures for testing (query "fail")

## Configuration

The worker uses the same configuration as the API server:
- Redis connection settings
- Database connection settings
- Environment variables

## Graceful Shutdown

The worker handles SIGINT and SIGTERM signals:
- Stops accepting new jobs
- Finishes current job (if any)
- Shuts down within 30 seconds

## Logging

The worker logs:
- Job start/completion/failure
- Retry attempts with backoff
- Error details
- Processing duration

## Future Enhancements (Phase 5)

- Real data enrichment from external sources
- Batch processing of companies
- Data validation and mapping
- More sophisticated error handling
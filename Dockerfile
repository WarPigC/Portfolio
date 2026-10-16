FROM python:3.12-alpine

WORKDIR /app

# Run as non-root user
RUN adduser -D -u 1000 appuser

COPY --chown=appuser:appuser . /app

USER appuser

EXPOSE 8081

CMD ["python", "-m", "http.server", "8081"]
import fs from 'fs';

export default async function download(
  sourceUrl,
  targetFile,
  progressRespCallback,
  length
) {
  const request = new Request(sourceUrl, {
    headers: new Headers({ 'Content-Type': 'application/octet-stream' })
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error(
      `Unable to download, server returned ${response.status} ${
        response.statusText
      }`
    );
  }

  const { body } = response;
  if (body == null) {
    throw Error('No response body');
  }

  const finalLength =
    length || parseInt(response.headers.get('Content-Length' || '0'), 10);
  const reader = body.getReader();
  const writer = fs.createWriteStream(targetFile);

  await streamFileWithProgress(
    finalLength,
    reader,
    writer,
    progressRespCallback
  );
  writer.end();
}

async function streamFileWithProgress(
  length,
  reader,
  writer,
  progressRespCallback
) {
  let bytesDone = 0;

  while (true) {
    const result = await reader.read();
    if (result.done) {
      if (progressRespCallback != null) {
        progressRespCallback(length, 100);
      }
      return;
    }

    const chunk = result.value;
    if (chunk == null) {
      throw Error('Empty chunk received during download');
    } else {
      writer.write(Buffer.from(chunk));
      if (progressRespCallback != null) {
        bytesDone += chunk.byteLength;
        const percent =
          length === 0 ? null : Math.floor((bytesDone / length) * 100);
        progressRespCallback(bytesDone, percent);
      }
    }
  }
}

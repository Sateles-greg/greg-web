// sensores/expressaoFacial.ts
// (usa face-api.js)

import * as faceapi from 'face-api.js';
// Certifique-se de carregar os modelos necessários antes de usar esta função

export async function iniciarDeteccaoFacial(
  videoElement: HTMLVideoElement,
  callback: (novoModo: any) => void
) {
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(
        videoElement,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
      )
      .withFaceExpressions();

    if (detections && detections.length > 0 && detections[0].expressions) {
      const expressions = detections[0].expressions;
      // FaceExpressions já é um objeto do tipo Record<string, number>
      const dominante = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];
      if (["sad", "happy", "neutral"].includes(dominante)) callback(dominante);
    }
  }, 3000);
}

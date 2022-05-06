export function fetchHeroImagesIds(heroId: number) {
  return new Promise<number[]>(async (resolve, reject) => {
    await fetch(`http://localhost:4000/hero-image/hero/${heroId}`)
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

export function fetchHeroImage(imageId: number) {
  return new Promise<Blob>(async (resolve, reject) => {
    await fetch(`http://localhost:4000/hero-image/${imageId}`)
      .then((res) => res.blob())
      .then((blob) => resolve(blob))
      .catch((err) => reject(err));
  });
}

export function postHeroImage(heroId: number, imageForm: FormData) {
  return new Promise<{ id: number }>(async (resolve, reject) => {
    await fetch(`http://localhost:4000/hero-image/add/${heroId}`, {
      method: "PUT",
      body: imageForm,
    })
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

export function deleteHeroImage(id: number) {
  return new Promise(async (resolve, reject) => {
    await fetch(`http://localhost:4000/hero-image/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

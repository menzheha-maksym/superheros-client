import { CreateHero, Hero } from "../interfaces/Hero";

export function fetchHeros() {
  return new Promise<Hero[]>(async (resolve, reject) => {
    await fetch("http://localhost:4000/heros")
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

export function fetchHerosWithPagiantion(limit = 5, skip = 0) {
  return new Promise<{ data: Hero[]; count: number }>(
    async (resolve, reject) => {
      await fetch(
        `http://localhost:4000/heros/pagination?limit=${limit}&skip=${skip}`
      )
        .then((res) => res.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    }
  );
}

export function fetchHeroById(id: number) {
  return new Promise<Hero>(async (resolve, reject) => {
    await fetch(`http://localhost:4000/heros/${id}`)
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

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

export function postCreateHero(hero: CreateHero) {
  return new Promise<Hero>(async (resolve, reject) => {
    await fetch(`http://localhost:4000/heros/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    })
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

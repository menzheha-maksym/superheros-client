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

export function deleteHero(id: number) {
  return new Promise(async (resolve, reject) => {
    await fetch(`http://localhost:4000/heros/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

export function updateHero(hero: Partial<Hero>) {
  return new Promise(async (resolve, reject) => {
    await fetch(`http://localhost:4000/heros/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    })
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

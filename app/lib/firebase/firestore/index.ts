"use server";

import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { NpcModel, NpcModelInput } from "@/models/npc";
import { ArtefactModel, ArtefactModelInput } from "@/models/artefact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// function applyQueryFilters(q, { category, city, price, sort }) {
// 	if (category) {
// 		q = query(q, where("category", "==", category));
// 	}
// 	if (city) {
// 		q = query(q, where("city", "==", city));
// 	}
// 	if (price) {
// 		q = query(q, where("price", "==", price.length));
// 	}
// 	if (sort === "Rating" || !sort) {
// 		q = query(q, orderBy("avgRating", "desc"));
// 	} else if (sort === "Review") {
// 		q = query(q, orderBy("numRatings", "desc"));
// 	}
// 	return q;
// }

export async function getNPCs(filters = {}): Promise<NpcModel[]> {
  let q = query(collection(db, "npcs"));

  // q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map(doc => {
    return {
      id: doc.id,
      ...(doc.data() as NpcModelInput),
      createdAt: new Date(doc.data().created_at).toDateString(),
      modifiedAt: new Date(doc.data().modified_at).toDateString(),
    };
  });
}

export async function addImportedNPCs(npcList: NpcModelInput[]) {
  const results = await Promise.all(
    npcList.map(async npc => {
      try {
        const docRef = await addDoc(collection(db, "npcs"), {
          ...npc,
          created_at: Date.now(),
          modified_at: Date.now(),
        });

        return docRef.id;
      } catch (err) {
        console.error("Error adding document: ", err);
        return null;
      }
    })
  );
}

export async function getNPC(npcId: string): Promise<NpcModel> {
  const docRef = doc(db, "npcs", npcId);

  try {
    const npc = await getDoc(docRef);

    console.log(npc);

    if (!npc) {
      redirect("/not-found");
    }

    return {
      id: npc.id,
      ...(npc.data() as NpcModelInput),
      createdAt: new Date(npc.data()!.created_at).toDateString(),
      modifiedAt: new Date(npc.data()!.modified_at).toDateString(),
    };
  } catch (e) {
    console.error("Error getting document: ", e);
    redirect("/not-found");
  }
}

export async function createNPC(npc: NpcModelInput): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "npcs"), {
      ...npc,
      created_at: Date.now(),
      modified_at: Date.now(),
    });

    return docRef.id;
  } catch (e) {
    console.log("There was an error adding the document");
    console.error("Error adding document: ", e);

    return null;
  }
}

// TODO: add updateNPC function
export async function updateNPC(npc: NpcModel): Promise<void> {}
// TODO: add deleteNPC function
export async function deleteNPC(npcId: string): Promise<void> {}

export async function getArtefacts(filters = {}): Promise<ArtefactModel[]> {
  let q = query(collection(db, "artefacts"));

  // q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map(doc => {
    return {
      id: doc.id,
      ...(doc.data() as ArtefactModelInput),
      createdAt: new Date(doc.data().created_at).toDateString(),
      modifiedAt: new Date(doc.data().modified_at).toDateString(),
    };
  });
}

export async function createArtefact(
  artefact: ArtefactModelInput
): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "artefacts"), {
      ...artefact,
      created_at: Date.now(),
      modified_at: Date.now(),
    });

    revalidatePath("/meals");

    return docRef.id;
  } catch (e) {
    console.log("There was an error adding the document");
    console.error("Error adding document: ", e);

    return null;
  }
}

export async function addImportedArtefacts(artList: ArtefactModelInput[]) {
  const results = await Promise.all(
    artList.map(async artefact => {
      try {
        const docRef = await addDoc(collection(db, "artefacts"), {
          ...artefact,
          created_at: Date.now(),
          modified_at: Date.now(),
        });

        return docRef.id;
      } catch (err) {
        console.error("Error adding document: ", err);
        return null;
      }
    })
  );

  console.log(results);
}

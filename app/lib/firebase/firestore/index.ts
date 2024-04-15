import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase";

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

export async function getNPCs(filters = {}) {
  let q = query(collection(db, "npcs"));

  // q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      createdAt: new Date(doc.data().created_at).toDateString(),
      modifiedAt: new Date(doc.data().modified_at).toDateString(),
    };
  });
}

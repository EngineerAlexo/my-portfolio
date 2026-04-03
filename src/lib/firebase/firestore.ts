import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { fallbackProjects } from "@/data/site";
import { getFirebaseServices } from "@/lib/firebase/client";
import type { ContactSchema } from "@/lib/validators/contact";
import type { Project } from "@/types/portfolio";

const PROJECTS_COLLECTION = "projects";
const MESSAGES_COLLECTION = "messages";

function toIsoString(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }

  return new Date().toISOString();
}

function projectCollection() {
  const { db } = getFirebaseServices();
  if (!db) {
    return null;
  }

  return collection(db, PROJECTS_COLLECTION);
}

function messagesCollection() {
  const { db } = getFirebaseServices();
  if (!db) {
    return null;
  }

  return collection(db, MESSAGES_COLLECTION);
}

function normalizeProject(data: Partial<Project> & { id: string }): Project {
  return {
    id: data.id,
    title: data.title ?? "Untitled project",
    description: data.description ?? "",
    stack: Array.isArray(data.stack) ? data.stack : [],
    githubUrl: data.githubUrl ?? "",
    demoUrl: data.demoUrl ?? "",
    image: data.image ?? "/projects/dev-showcase.svg",
    featured: Boolean(data.featured),
    published: data.published ?? true,
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

export async function getProjects() {
  const projectsRef = projectCollection();

  if (!projectsRef) {
    return fallbackProjects;
  }

  const snapshot = await getDocs(query(projectsRef, orderBy("createdAt", "desc")));
  const projects = snapshot.docs.map((projectDoc) => {
    const raw = projectDoc.data() as Partial<Project>;
    return normalizeProject({
      ...raw,
      id: projectDoc.id,
      createdAt: toIsoString(raw.createdAt),
      updatedAt: toIsoString(raw.updatedAt),
    });
  });

  return projects.length > 0 ? projects : fallbackProjects;
}

export async function saveProject(project: Omit<Project, "createdAt" | "updatedAt"> & { createdAt?: string }) {
  const projectsRef = projectCollection();

  if (!projectsRef) {
    throw new Error("Firebase is not configured yet. Add your environment variables to enable project management.");
  }

  const projectRef = doc(projectsRef, project.id);
  const timestamp = new Date().toISOString();

  await setDoc(
    projectRef,
    {
      ...project,
      createdAt: project.createdAt ?? timestamp,
      updatedAt: timestamp,
      stack: project.stack,
    },
    { merge: true },
  );
}

export async function removeProject(projectId: string) {
  const projectsRef = projectCollection();

  if (!projectsRef) {
    throw new Error("Firebase is not configured yet. Add your environment variables to enable project deletion.");
  }

  await deleteDoc(doc(projectsRef, projectId));
}

export async function submitContactMessage(values: ContactSchema) {
  const messagesRef = messagesCollection();

  if (!messagesRef) {
    throw new Error("Firebase is not configured yet. Add your environment variables to store contact messages.");
  }

  await addDoc(messagesRef, {
    ...values,
    createdAt: serverTimestamp(),
  });
}

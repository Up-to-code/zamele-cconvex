import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    name: v.string(),
    userType: v.union(v.literal("student"), v.literal("teacher")),
    universityId: v.optional(v.string()),
    sectionId: v.optional(v.string()),
    year: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
    canCreateCommunity: v.optional(v.boolean()),
    isVerified: v.optional(v.boolean()),
    plan: v.optional(v.union(v.literal("free"), v.literal("pro"), v.literal("max"))),
    points: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerkUserId", ["clerkUserId"]).index("by_email", ["email"]),
});



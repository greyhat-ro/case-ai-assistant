"use strict";
// Demo SOP library. In a real system these would be full SOP documents in a
// shared drive; here each entry stands in for one SOP with its key steps
// and a link to a demo page in this repo.
const SOPS = [
  { id: "pmr-entry", title: "Positive Match Record — Data Entry Guide", category: "PMR",
    url: "sops/pmr-entry.html",
    keywords: ["pmr", "positive match record", "match basis", "entering details", "locked field", "data entry", "case status"],
    steps: [
      "Confirm the case status is set to 'Under Review' before opening the PMR module — most entry fields stay locked on any other status.",
      "In 'Match Basis', select the list type that triggered the hit (e.g. BIS Entity List, OFAC SDN) — this unlocks the fields below it.",
      "Enter the matched name exactly as it appears on the source list, then attach the screening report as supporting evidence.",
      "Save as draft before submitting — a draft lets a second reviewer check the entry before it's finalised."
    ]},
  { id: "bis-hit", title: "Sanctions List Hit Handling — BIS Entity List", category: "Sanctions screening",
    url: "sops/bis-hit.html",
    keywords: ["bis", "san hit", "sanctions", "entity list", "screening", "export control", "denied party"],
    steps: [
      "Verify the hit against the live BIS Entity List export (not a cached copy) using name and address, not name alone.",
      "Check for a partial-match false positive — common with transliterated names — before treating the hit as confirmed.",
      "Log a confirmed hit as a Positive Match Record; log a cleared false positive with the reviewer's name and reasoning.",
      "Escalate to the sanctions lead if the counterparty appears on more than one list."
    ]},
  { id: "escalation", title: "Case Escalation Pathway", category: "Escalation",
    url: "sops/escalation.html",
    keywords: ["escalate", "escalation", "second reviewer", "unresolved", "manager", "aoc", "adverse"],
    steps: [
      "Escalate any case open more than 48 hours without resolution, or any case with a Decision of AOC (Adverse/Other Concern).",
      "Tag the case with the escalation reason and the specific SOP section the ambiguity relates to.",
      "Notify the team lead directly for escalations flagged 'urgent' — do not rely on the queue alone."
    ]},
  { id: "disablement", title: "Account Disablement Procedure", category: "Post-decision",
    url: "sops/disablement.html",
    keywords: ["disablement", "disable account", "freeze", "suspend", "post-decision"],
    steps: [
      "Disablement requires a confirmed Decision of F+ or PM and sign-off from a second reviewer.",
      "Record the disablement timestamp and reference case ID in the account system, not just the case dashboard.",
      "Notify the account holder only if the relevant regional policy permits pre-notification."
    ]},
  { id: "closure", title: "Case Closure Checklist", category: "Post-decision",
    url: "sops/closure.html",
    keywords: ["closure", "close case", "resolved", "no further action"],
    steps: [
      "Confirm every required field (Decision, Post-decision, annotation) is filled before closing.",
      "Attach final evidence and reviewer sign-off to the case record.",
      "Closure is final — reopening requires a new case reference, not an edit to the closed one."
    ]}
];

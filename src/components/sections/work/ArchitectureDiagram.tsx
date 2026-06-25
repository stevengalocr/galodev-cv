"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/work/types";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

/**
 * Vertical pipeline of architecture nodes connected by self-drawing lines.
 * Edge labels (when the consecutive pair has one) annotate the connector.
 */
export function ArchitectureDiagram({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const reduced = usePrefersReducedMotion();
  const { nodes, edges } = project.architecture;

  const labelFor = (fromId: string, toId: string) =>
    edges.find((e) => e.from === fromId && e.to === toId)?.label;

  return (
    <div className="mx-auto max-w-xl">
      <ol className="relative">
        {nodes.map((n, i) => {
          const last = i === nodes.length - 1;
          const edgeLabel = !last ? labelFor(n.id, nodes[i + 1].id) : undefined;
          return (
            <li key={n.id} className="relative">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, ease: EASE.out, delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface/70 p-4 backdrop-blur-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/40 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-sm font-medium text-text">{n.label}</p>
                  <p className="text-sm text-muted">{resolveBilingual(n.role, locale)}</p>
                </div>
              </motion.div>

              {!last && (
                <div className="flex h-12 items-center justify-center">
                  <svg width="2" height="48" viewBox="0 0 2 48" className="overflow-visible">
                    {reduced ? (
                      <line x1="1" y1="0" x2="1" y2="48" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 4" />
                    ) : (
                      <motion.line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="48"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeDasharray="3 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.8 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.5, ease: EASE.inOut, delay: i * 0.08 + 0.2 }}
                      />
                    )}
                  </svg>
                  {edgeLabel && (
                    <span className="absolute translate-x-8 font-mono text-[0.65rem] uppercase tracking-wide text-faint">
                      {edgeLabel}
                    </span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

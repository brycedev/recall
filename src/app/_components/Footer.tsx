import { ContainerInner } from "~/app/_components/Container";

export function Footer() {
  return (
    <footer className="flex-none">
      <div className="border-t border-zinc-700/40 py-4">
        <ContainerInner>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} STBL. All rights reserved.
            </p>
          </div>
        </ContainerInner>
      </div>
    </footer>
  );
}

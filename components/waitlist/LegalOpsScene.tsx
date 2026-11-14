'use client';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { stagePanel } from '@/components/hero/HeroKit';
import { tileBar, tileWindow } from '@/components/FeatureTile';
import { ExcelIcon, GmailIcon } from '@/components/BrandIcons';

// The /legalops hero card, in the Solutions style: a soft panel with a small LegalOps window.
// Loop (6s, CSS `.lo-*` in globals.css): the partner asks "Isto está com quem?", the task row
// lights up, its status goes Por fazer → Em curso → Concluído, the deadline gets its second
// check and the answer appears; an Excel file and a client email drop in. `in-view` is set from
// the start, so it plays on phones too.

// Illustrative team (stock portraits): Rui, the partner, asks; Ana and Tiago do the work.
const TASKS = [
  { task: 'Contestação', proc: 'Proc. 1043/25', who: 'ana' },
  { task: 'Requerimento de prova', proc: 'Proc. 877/25', who: 'tiago', status: 'Em curso' },
  { task: 'Juntar procuração', proc: 'Proc. 512/24', who: 'ana', status: 'Concluído' },
];

function Avatar({ name, size = 24, ring = false }: { name: string; size?: number; ring?: boolean }) {
  return (
    <Image
      src={'/legalops/people/' + name + '.webp'}
      alt=""
      width={size}
      height={size}
      className={'shrink-0 rounded-full object-cover ' + (ring ? 'ring-2 ring-white dark:ring-[#0f1729]' : '')}
      style={{ width: size, height: size }}
    />
  );
}

const chip = 'rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap';
const chipTodo = chip + ' bg-black/[0.05] text-black/55 dark:bg-white/10 dark:text-white/60';
const chipDoing = chip + ' bg-[#ff9f0a]/15 text-[#b25f00] dark:text-[#ffb340]';
const chipDone = chip + ' flex items-center gap-1 bg-[#28c840]/15 text-[#1a9e33] dark:text-[#5fe07a]';
const source = 'svc-file absolute flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2 py-1 text-[10px] font-semibold text-black/60 shadow-sm dark:border-white/10 dark:bg-[#16203a] dark:text-white/65';

export function LegalOpsScene() {
  return (
    <div className={`in-view relative flex h-[23rem] items-center justify-center overflow-hidden sm:h-[26rem] ${stagePanel}`} aria-hidden="true">
      {/* the question */}
      <div className="loop lo-q absolute left-4 top-5 flex items-center gap-2 sm:left-8 sm:top-7">
        <Avatar name="rui" size={30} />
        <span className="rounded-2xl rounded-tl-md border border-black/[0.06] bg-white px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] shadow-sm dark:border-white/10 dark:bg-[#16203a] dark:text-white">
          <span className="loop lo-type inline-block">Isto está com quem?</span>
        </span>
      </div>

      {/* sources dropping in: an Excel import and a client email */}
      <span className={source + ' right-4 top-6 sm:right-8'} style={{ animationDelay: '0.3s' }}>
        <ExcelIcon className="h-3.5 w-3.5" />processos.xlsx
      </span>
      <span className={source + ' right-8 top-16 hidden sm:flex sm:right-24'} style={{ animationDelay: '0.9s' }}>
        <GmailIcon className="h-3.5 w-3.5" />E-mail do cliente
      </span>

      <div className={`${tileWindow} relative mt-8 w-[90%] max-w-[400px] lg:scale-[1.12]`}>
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5 dark:border-white/10">
          <Image src="/legalops/logo.png" alt="" width={570} height={140} className="h-4 w-auto dark:brightness-0 dark:invert" />
          <span className="flex items-center gap-1.5">
            <span className={`${tileBar} h-2 w-10`}></span>
            <span className="text-[10px] font-semibold text-black/45 dark:text-white/45">Tarefas</span>
          </span>
        </div>

        <div className="px-2.5 py-2">
          {TASKS.map((t, i) => (
            <div key={t.task} className={`${i === 0 ? 'loop lo-hl' : ''} flex items-center gap-2.5 rounded-lg px-2 py-2`}>
              <Avatar name={t.who} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-[#1d1d1f] dark:text-white">{t.task}</span>
                <span className="block text-[10px] text-black/45 dark:text-white/45">{t.proc}</span>
              </span>
              {i === 0 ? (
                <span className="grid justify-items-end">
                  <span className={`loop lo-s1 [grid-area:1/1] ${chipTodo}`}>Por fazer</span>
                  <span className={`loop lo-s2 [grid-area:1/1] ${chipDoing}`}>Em curso</span>
                  <span className={`loop lo-s3 [grid-area:1/1] ${chipDone}`}><Check className="h-2.5 w-2.5" strokeWidth={3.5} />Concluído</span>
                </span>
              ) : (
                <span className={t.status === 'Concluído' ? chipDone : chipDoing}>
                  {t.status === 'Concluído' && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}{t.status}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* the deadline, confirmed by a second person */}
        <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] px-4 py-2.5 dark:border-white/10">
          <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white">Prazo · 21 nov</span>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-black/55 dark:text-white/60">
            <span className="flex -space-x-1.5"><Avatar name="ana" size={18} ring /><Avatar name="tiago" size={18} ring /></span>
            Confirmado
            <span className="loop pth-tick flex h-4 w-4 items-center justify-center rounded-full bg-[#007AFF]" style={{ animationDelay: '1.8s' }}>
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
            </span>
          </span>
        </div>

        {/* the answer */}
        <div className="loop lo-a absolute -bottom-5 right-3 flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white py-1.5 pl-1.5 pr-3 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-[#16203a] sm:-right-5">
          <Avatar name="ana" size={22} />
          <span className="whitespace-nowrap text-[11px] font-semibold text-[#1d1d1f] dark:text-white">Com a Ana · concluído hoje</span>
        </div>
      </div>
    </div>
  );
}

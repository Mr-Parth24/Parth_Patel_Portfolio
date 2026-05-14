import re

with open('src/components/sections/ExperienceSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove global constants
content = re.sub(r'const CARD_W = 420;\nconst GAP = 28;\nconst UNIT = CARD_W \+ GAP;\n\n', '', content)

# 2. Update ExpCard signature and usage
content = content.replace('function ExpCard({ exp, isActive }: { exp: IExperience; isActive: boolean }) {', 'function ExpCard({ exp, isActive, cardW }: { exp: IExperience; isActive: boolean; cardW: number }) {')
content = content.replace('style={{ width: CARD_W, flexShrink: 0 }}', 'style={{ width: cardW, flexShrink: 0 }}')
content = content.replace('<ExpCard key={i} exp={exp} isActive={i === tripledActive} />', '<ExpCard key={i} exp={exp} isActive={i === tripledActive} cardW={cardW} />')

# 3. Insert state variables in ExperienceSection
state_vars = '''  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(800);
  const [cardW, setCardW] = useState(420);
  const gap = 28;
  const unit = cardW + gap;
'''
content = re.sub(r'  const containerRef = useRef<HTMLDivElement>\(null\);\n  const \[containerW, setContainerW\] = useState\(800\);', state_vars, content)

# 4. Update Measure container useEffect
measure_effect = '''  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const cw = el.offsetWidth;
      setContainerW(cw);
      setCardW(Math.min(420, cw - 48)); // Leave padding on mobile
    });
    ro.observe(el);
    const cw = el.offsetWidth;
    setContainerW(cw);
    setCardW(Math.min(420, cw - 48));
    return () => ro.disconnect();
  }, []);'''
content = re.sub(r'  // Measure container\n  useEffect\(\(\) => {[\s\S]*?  }, \[\]\);', measure_effect, content)

# 5. Replace CARD_W and UNIT with cardW and unit inside ExperienceSection
content = content.replace('CARD_W', 'cardW')
content = content.replace('UNIT', 'unit')
content = content.replace('[containerW]', '[containerW, cardW, unit]')
content = content.replace('[x, containerW]', '[x, containerW, cardW, unit]')
content = content.replace('[virtualIdx, snapTo]', '[virtualIdx, snapTo, unit]')

with open('src/components/sections/ExperienceSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ExperienceSection.tsx")

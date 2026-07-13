# Git para ASCEP

## Que es Git?

Git es un sistema de control de versiones. Guarda "fotos" (commits) de tu proyecto a lo largo del tiempo para que puedas volver atras, ver cambios, y trabajar en equipo sin pisarte.

---

## Flujo basico del dia a dia

```bash
# 1. Ver en que estado esta tu repositorio
git status

# 2. Ver que cambiaste (linea por linea)
git diff

# 3. Preparar archivos para commit
git add archivo.tsx           # un archivo especifico
git add src/                  # toda una carpeta
git add -A                    # todos los cambios (nuevos, modificados, eliminados)

# 4. Guardar el commit (crear la "foto")
git commit -m "Descripcion de lo que hiciste"

# 5. Subir a GitHub
git push

# 6. Bajar cambios de GitHub (si alguien mas modifico)
git pull
```

El ciclo es: **modificas archivos** -> `git add` -> `git commit` -> `git push`

---

## Comandos que viste en esta sesion

### git status
Muestra el estado actual: archivos modificados, nuevos, eliminados, y cuales estan listos para commit.

```bash
git status                    # version larga (recomendada)
git status --short            # version corta (M=modificado, A=nuevo, D=eliminado, ??=sin seguimiento)
```

### git diff
Muestra los cambios exactos linea por linea en los archivos modificados.

```bash
git diff                      # cambios sin staged
git diff --stat               # solo los nombres de archivos, no el contenido
```

### git add
Pasa archivos del "working directory" al "staging area" (preparacion para commit).

```bash
git add archivo.tsx           # un archivo
git add src/components/       # toda una carpeta
git add -A                    # todos los cambios (nuevos, modificados, eliminados)
git add --all                 # igual que -A
```

### git reset
Saca archivos del staging area sin perder los cambios.

```bash
git reset archivo.tsx         # quita archivo del stage, los cambios se conservan
git reset -- "carpeta con espacios/"  # con espacios, usar comillas
```

### git commit
Crea un punto de guardado (commit) con los archivos que estan en stage.

```bash
git commit -m "Mensaje"       # mensaje corto
git commit -m "Titulo" -m "Descripcion larga..."  # multiples lineas
```

**Reglas para el mensaje:**
- Maximo 50 caracteres en la primera linea
- En presente: "Fix bug" no "Fixed bug" ni "Fixing bug"
- Describe QUE hace el cambio, no POR QUE

### git push
Sube tus commits locales a GitHub.

```bash
git push                      # sube a la rama actual
git push origin main          # explicito: sube main a origin
```

Si falla, a veces es porque alguien mas empujo antes (ver `git pull`).

### git pull
Baja los cambios de GitHub y los fusiona con tu trabajo local.

```bash
git pull                      # equivalente a git fetch + git merge
```

Siempre haz `git pull` antes de empezar a trabajar para tener lo ultimo.

### git log
Historial de commits.

```bash
git log                       # lista completa
git log --oneline             # compacto (1 linea por commit)
git log --oneline -5          # ultimos 5 commits
```

---

## Ramas (branches)

Son "lineas de tiempo" paralelas. Sirven para desarrollar funciones sin romper main.

```bash
git branch                    # lista las ramas locales
git branch nueva-funcion      # crea una rama nueva
git checkout nueva-funcion    # cambiate a esa rama
git switch nueva-funcion      # igual que checkout (mas moderno)
git checkout -b nueva-funcion # crea y cambiate en un solo comando

git merge nueva-funcion       # fusiona nueva-funcion a la rama actual
git branch -d nueva-funcion   # elimina la rama (despues de merge)
```

---

## Deshacer cambios

```bash
# Si NO has hecho add ni commit:
git checkout -- archivo.tsx   # descarta cambios en un archivo
git restore archivo.tsx       # igual (version moderna)

# Si ya hiciste add pero no commit:
git reset archivo.tsx         # quita del stage
git checkout -- archivo.tsx   # descarta cambios

# Si ya hiciste commit (pero no push):
git commit --amend -m "Nuevo mensaje"  # corrige el ultimo commit

# Si ya hiciste push:
git revert HEAD               # crea un nuevo commit que deshace el ultimo
```

---

## Ejemplo practico: sesion tipica

```bash
# 1. Empezar el dia
cd C:\Users\Home\Desktop\ascep\web
git pull                      # bajamos lo ultimo

# 2. Trabajar... modificar archivos...

# 3. Ver que cambio
git status
git diff --stat

# 4. Preparar todo para commit
git add -A

# 5. Guardar
git commit -m "Descripcion clara del cambio"

# 6. Subir
git push
```

---

## Tips

| Situacion | Comando |
|-----------|---------|
| Ver cambios de una sesion | `git diff --stat` |
| Ver historial rapido | `git log --oneline --graph` |
| Ignorar archivos | Editar `.gitignore` |
| Ver que archivos subiran | `git status` |
| Commit con archivos especificos | `git add src/componente.tsx && git commit -m "msg"` |
| Commit de todo directo | `git add -A && git commit -m "msg"` |
| Salir de pantalla (less) | `q` |
| Archivos con espacios | Usar comillas: `git add "mi archivo.tsx"` |

## .gitignore

Archivos que git ignora (no los trackea). Ejemplo del proyecto:

```
node_modules/
.next/
.env.local
public/images/encuentro-2025/
public/images/equipo-shoot/
```

Si hay una carpeta de fotos fuente que no quieres subir, agregala al `.gitignore`.

---

## Frases utiles

| Ingles | Significado |
|--------|-------------|
| working tree clean | no hay cambios pendientes |
| Changes not staged | cambios que no estan preparados para commit |
| Untracked files | archivos nuevos que git no sigue |
| Your branch is ahead | tienes commits locales sin subir |
| merge conflict | dos personas modificaron el mismo archivo |

---

## Si algo sale mal

1. `git status` para ver donde estas
2. Si hay merge conflict: busca `<<<<<<<`, `=======`, `>>>>>>>` en los archivos, editalos, luego `git add` y `git commit`
3. Si no sabes que hacer: `git log --oneline`, busca el hash del commit anterior, y avisa

---

Eso es lo esencial. Con estos comandos haces el 95% del trabajo diario.

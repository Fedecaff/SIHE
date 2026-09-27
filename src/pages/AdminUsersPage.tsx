import { useEffect, useState, type FormEvent } from "react";

import { Link } from "react-router-dom";

import { roleLabel } from "@/lib/roleLabel";

import {

  createUserAccount,

  listProfiles,

  updateProfileAdmin,

} from "@/services/resources";

import { UserRole, type ProfileAdmin } from "@/types/sihe";



type EditState = {

  id: string;

  name: string;

  institution: string;

  app_role: UserRole;

  active: boolean;

};



export function AdminUsersPage() {

  const [users, setUsers] = useState<ProfileAdmin[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const [edit, setEdit] = useState<EditState | null>(null);

  const [saving, setSaving] = useState(false);



  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [institution, setInstitution] = useState("");

  const [role, setRole] = useState<UserRole>(UserRole.Operador);



  async function reload() {

    const data = await listProfiles();

    setUsers(data);

  }



  useEffect(() => {

    let cancelled = false;

    setLoading(true);

    void reload()

      .catch((err: unknown) => {

        if (!cancelled) {

          setError(err instanceof Error ? err.message : "Error al cargar");

        }

      })

      .finally(() => {

        if (!cancelled) setLoading(false);

      });

    return () => {

      cancelled = true;

    };

  }, []);



  async function onCreate(e: FormEvent) {

    e.preventDefault();

    setSaving(true);

    setError(null);

    setMessage(null);

    try {

      await createUserAccount({

        email,

        password,

        name,

        institution,

        role,

      });

      setEmail("");

      setPassword("");

      setName("");

      setInstitution("");

      setRole(UserRole.Operador);

      setMessage("Usuario creado.");

      await reload();

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo crear");

    } finally {

      setSaving(false);

    }

  }



  async function onSaveEdit(e: FormEvent) {

    e.preventDefault();

    if (!edit) return;

    setSaving(true);

    setError(null);

    setMessage(null);

    try {

      await updateProfileAdmin(edit);

      setEdit(null);

      setMessage("Usuario actualizado.");

      await reload();

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo guardar");

    } finally {

      setSaving(false);

    }

  }



  return (

    <div className="admin-page">

      <div className="list-header" style={{ paddingLeft: 0, paddingRight: 0 }}>

        <div>

          <h1>Gestión de usuarios</h1>

          <p className="list-subtitle">Sin registro público: altas solo desde acá.</p>

        </div>

        <Link to="/admin" className="btn-toolbar">

          Volver al panel

        </Link>

      </div>



      {error ? (

        <p className="form-error" role="alert">

          {error}

        </p>

      ) : null}

      {message ? <p className="form-ok">{message}</p> : null}



      <section className="form-card">

        <h2>Nuevo usuario</h2>

        <form onSubmit={(e) => void onCreate(e)}>

          <div className="form-row">

            <label className="field">

              <span>Nombre</span>

              <input

                value={name}

                onChange={(e) => setName(e.target.value)}

                required

              />

            </label>

            <label className="field">

              <span>Email</span>

              <input

                type="email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                required

              />

            </label>

          </div>

          <div className="form-row">

            <label className="field">

              <span>Institución</span>

              <input

                value={institution}

                onChange={(e) => setInstitution(e.target.value)}

                required

              />

            </label>

            <label className="field">

              <span>Rol</span>

              <select

                value={role}

                onChange={(e) => setRole(e.target.value as UserRole)}

              >

                <option value={UserRole.Operador}>Operador</option>

                <option value={UserRole.Administrador}>Administrador</option>

              </select>

            </label>

          </div>

          <label className="field">

            <span>Contraseña temporal</span>

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              minLength={6}

              required

            />

          </label>

          <button type="submit" className="btn-primary btn-inline" disabled={saving}>

            {saving ? "Creando…" : "Crear usuario"}

          </button>

        </form>

      </section>



      <div className="list-table-wrap" style={{ padding: "16px 0" }}>

        {loading ? (

          <p>Cargando…</p>

        ) : (

          <table className="list-table">

            <thead>

              <tr>

                <th>Nombre</th>

                <th>Institución</th>

                <th>Rol</th>

                <th>Estado</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {users.map((u) => (

                <tr key={u.id}>

                  <td>

                    <div>{u.name}</div>

                    <small className="muted">{u.email}</small>

                  </td>

                  <td>{u.institution}</td>

                  <td>{roleLabel(u.app_role)}</td>

                  <td>{u.active ? "Activo" : "Inactivo"}</td>

                  <td>

                    <button

                      type="button"

                      className="list-link"

                      style={{

                        background: "none",

                        border: "none",

                        cursor: "pointer",

                        padding: 0,

                        font: "inherit",

                      }}

                      onClick={() =>

                        setEdit({

                          id: u.id,

                          name: u.name,

                          institution: u.institution,

                          app_role: u.app_role,

                          active: u.active,

                        })

                      }

                    >

                      Editar

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>



      {edit ? (

        <section className="form-card">

          <h2>Editar usuario</h2>

          <form onSubmit={(e) => void onSaveEdit(e)}>

            <label className="field">

              <span>Nombre</span>

              <input

                value={edit.name}

                onChange={(e) => setEdit({ ...edit, name: e.target.value })}

                required

              />

            </label>

            <label className="field">

              <span>Institución</span>

              <input

                value={edit.institution}

                onChange={(e) =>

                  setEdit({ ...edit, institution: e.target.value })

                }

                required

              />

            </label>

            <label className="field">

              <span>Rol</span>

              <select

                value={edit.app_role}

                onChange={(e) =>

                  setEdit({

                    ...edit,

                    app_role: e.target.value as UserRole,

                  })

                }

              >

                <option value={UserRole.Operador}>Operador</option>

                <option value={UserRole.Administrador}>Administrador</option>

              </select>

            </label>

            <label className="field field-check">

              <input

                type="checkbox"

                checked={edit.active}

                onChange={(e) =>

                  setEdit({ ...edit, active: e.target.checked })

                }

              />

              <span>Cuenta activa</span>

            </label>

            <div className="form-actions">

              <button

                type="submit"

                className="btn-primary btn-inline"

                disabled={saving}

              >

                Guardar

              </button>

              <button

                type="button"

                className="btn-toolbar"

                onClick={() => setEdit(null)}

              >

                Cancelar

              </button>

            </div>

          </form>

        </section>

      ) : null}

    </div>

  );

}



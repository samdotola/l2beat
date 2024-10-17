import { ContractEntry, type TechnologyContract } from '../contract-entry'
import { PermissionedEntityEntry } from '../permissioned-entity-entry'
import { ProjectSection } from '../project-section'
import { type ProjectSectionProps } from '../types'

export interface PermissionsSectionProps extends ProjectSectionProps {
  permissions: TechnologyContract[]
  nativePermissions: Record<string, TechnologyContract[]>
  permissionedEntities?: { name: string; href: string }[]
}

export function PermissionsSection({
  permissions,
  nativePermissions,
  permissionedEntities,
  ...sectionProps
}: PermissionsSectionProps) {
  return (
    <ProjectSection {...sectionProps} includeChildrenIfUnderReview>
      {permissionedEntities && (
        <h3 className="mt-4 font-bold">The DAC has the following members:</h3>
      )}
      {permissionedEntities?.map((entity) => (
        <PermissionedEntityEntry
          key={entity.href}
          {...entity}
          className="my-2"
        />
      ))}
      <h3 className="mt-4 font-bold">
        The system uses the following set of permissioned addresses:
      </h3>
      <div className="my-4">
        {permissions.map((permission, i) => (
          <ContractEntry
            key={i}
            contract={permission}
            className="my-4"
            type="permission"
          />
        ))}
        {nativePermissions !== undefined &&
          Object.entries(nativePermissions).map(([chainName, permissions]) => {
            if (permissions.length === 0) {
              return null
            }
            return (
              <div key={chainName}>
                <h3 className="font-bold">
                  The system consists of the following permissions on{' '}
                  {chainName}:
                </h3>
                {permissions.map((permission, i) => (
                  <ContractEntry
                    key={i}
                    contract={permission}
                    className="my-4"
                    type="permission"
                  />
                ))}
              </div>
            )
          })}
      </div>
    </ProjectSection>
  )
}

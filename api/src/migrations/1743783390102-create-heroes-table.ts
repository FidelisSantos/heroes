import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHeroesTable1743783390102 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "heroes",
                columns: [
                    {
                        name: "id",
                        type: "bigint",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "nickname",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "date_of_birth",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "universe",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "main_power",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "avatar_url",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("heroes");
    }
}

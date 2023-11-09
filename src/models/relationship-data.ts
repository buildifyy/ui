export interface RelationshipData {
  readonly id: string;
  readonly name: string;
  readonly source: string;
  readonly target: string[];
  readonly cardinality: string;
  readonly inverse: string;
}

import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf11sparql.TreeSitterRdf11Sparql;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf11SparqlTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf11Sparql.language()));
    }
}

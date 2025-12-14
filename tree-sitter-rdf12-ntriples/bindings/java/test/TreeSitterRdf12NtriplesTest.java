import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf12ntriples.TreeSitterRdf12Ntriples;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf12NtriplesTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf12Ntriples.language()));
    }
}
